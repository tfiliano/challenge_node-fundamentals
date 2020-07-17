import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((balance: Balance, transaction: Transaction) => {
      balance[transaction.type] += transaction.value;

      if (transaction.type === 'outcome')
        balance.total = balance.total - transaction.value
      else
        balance.total = balance.total + transaction.value

      return balance
    }, { income: 0, outcome: 0, total: 0 });

    return balance;
  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type
    })

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
