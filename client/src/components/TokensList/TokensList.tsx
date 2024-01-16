import { selectListeningTokens, selectTokens } from 'src/store/slices/networks/selectors';
import { useSocketContext } from 'src/contexts/SocketContexts';
import { useAppSelector } from 'src/store';

const TokensList = () => {
  const { startListenContract } = useSocketContext();

  const tokens = useAppSelector(selectTokens);
  const listeningTokens = useAppSelector(selectListeningTokens);

  const startListenToken = (address: string) => {
    startListenContract(address);
  };

  return (
    <div className="w-1/2 max">
      <h3 className="text-2xl font-bold text-center mb-3">New Tokens List</h3>
      <ul className="border-2 rounded-lg border-lime-700 p-4 h-96 overflow-hidden">
        <div className="overflow-auto max-h-full flex flex-col gap-2">
          {!tokens.length && <p className="text-center pt-8 text-xl">Here you will see new tokens</p>}

          {tokens.map((token) => {
            const isListening = listeningTokens.includes(token.address);

            return (
              <li
                key={token.address}
                className="border border-lime-700 rounded-lg flex items-center p-2 justify-between"
              >
                <p>
                  {token.address} - {token.symbol}
                </p>
                <button
                  disabled={isListening}
                  className="inline-flex justify-center py-1 px-2 border border-transparent shadow-sm rounded-md text-white bg-lime-700 focus:outline-none disabled:opacity-50"
                  onClick={() => {
                    startListenToken(token.address);
                  }}
                >
                  {isListening ? 'Is listening' : 'Listen transactions'}
                </button>
              </li>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

export default TokensList;
