import { arweave } from './walletConnect.js';

export async function getHighScore() {
  const query = {
    op: 'and',
    expr1: {
      op: 'equals',
      expr1: 'App-Name',
      expr2: 'GameHighScore'
    },
    expr2: {
      op: 'equals',
      expr1: 'Content-Type',
      expr2: 'text/plain'
    }
  };

  const results = await arweave.arql(query);
  let highScore = 0;
  
  for (let id of results) {
    const data = await arweave.transactions.getData(id, { decode: true, string: true });
    const score = parseInt(data, 10);
    if (score > highScore) highScore = score;
  }
  
  return highScore;
}
