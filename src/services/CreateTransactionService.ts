import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (!["income", "outcome"].includes(type)) {
      throw new Error('Type must to be income or outcome')
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw new Error('Insufficient funds for this transaction');
      }
    }

    const transaction = this.transactionsRepository.create(
      title,
      value,
      type
    )

    return transaction
  }
}

export default CreateTransactionService;
