import torch
import torch.nn.functional as F 

def train(model, train_loader, loss_func, optimizer, step, print_step=200):
    model.train()
    for i, batch in enumerate(train_loader):
        inputs, targets = batch.text, batch.label.float()
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = loss_func(outputs, targets)
        loss.backward()
        optimizer.step()
        if i % print_step == 0:
            print('Train Step: {} ({:05.2f}%)  \tLoss: {:.4f}'.format(
                    step, 100.*(i*train_loader.batch_size)/len(train_loader.dataset), 
                    loss.item()))

def test(model, test_loader, loss_func):
    model.eval()
    test_loss = 0
    correct = 0
    with torch.no_grad():
        for batch in test_loader:
            inputs, targets = batch.text, batch.label.float()
            outputs = model(inputs)
            test_loss += loss_func(outputs, targets, reduction="sum").item()
            preds = torch.sigmoid(outputs).ge(0.5).float()
            correct += preds.eq(targets).sum().item()         
    test_loss /= len(test_loader.dataset)
    test_acc = correct / len(test_loader.dataset)
    print('Test set: Average loss: {:.4f}, Accuracy: {}/{} ({:05.2f}%)'.format(
        test_loss, correct, len(test_loader.dataset), 100. * test_acc))
    return test_loss, test_acc

def main(model, train_loader, test_loader, loss_func, optimizer, n_step, 
         save_path=None, print_step=30):
    test_accs = []
    best_acc = 0.0
    for step in range(1, n_step+1):
        train(model, train_loader, loss_func, optimizer, 
              step=step, print_step=print_step)
        test_loss, test_acc = test(model, test_loader, 
                                   loss_func=F.binary_cross_entropy_with_logits)
        test_accs.append(test_acc)
        if len(test_accs) >= 2:
            if test_acc >= best_acc:
                best_acc = test_acc
                best_state_dict = model.state_dict()
                print("discard previous state, best model state saved!")
        print("")
    if save_path is not None:
        torch.save(best_state_dict, save_path)