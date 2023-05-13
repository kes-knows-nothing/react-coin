import styled from "styled-components";
import { Link } from 'react-router-dom';
import { fetchCoins } from "../api";
import { useQuery } from "react-query"; 
import {Helmet} from "react-helmet"
import { isDarkAtom } from "./atoms";
import { useSetRecoilState } from "recoil"

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display:flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    align-items: center;
    transition: color 0.5s ease-in;
    display: flex;
  }
  &:hover {
    a {
        color: ${(props) => props.theme.accentColor}
      }
}
`;

const Title = styled.h1`
  font-size: 48px;
  color:${props => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`
const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`


type ICoin = {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}


function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
  // const [coins, setCoins] = useState<CoinInterface []>([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async() => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins")
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100))
  //     setLoading(false)
  //   })();
  // }, [])
  return (
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading? <Loader>Loading...</Loader> : <CoinsList>
        {data?.slice(0, 100).map((coin) => (
        <Coin key={coin.id}>
          <Link 
          to={{
            pathname: `/${coin.id}`,
            state: { name: coin.name },
          }}
            >
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} 
            />
            {coin.name} &rarr;
            </Link>
          </Coin>
          ))}
      </CoinsList>}
    </Container>
  );
}

export default Coins;