interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <h1 className="text-violet-400 font-bold text-4xl">Contagem: {props.count} </h1>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://127.0.0.1:3333/pools/count')
  const data = await response.json()
  
  return {
    props: {
      count: data.count,
    }
  }
}
