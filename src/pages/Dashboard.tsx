import EventCard from 'components/EventCard'

const items = [
  {
    token: {
      token_address: '0xD5123C9FB1206497E2e54fd1120AA2F896e273E9',
      token_id: '1',
      chain_id: 'mumbai',
    },
    title: 'Token 2049',
    users: 1,
    posts: 5,
  },
  {
    token: {
      token_address: '0xD5123C9FB1206497E2e54fd1120AA2F896e273E9',
      token_id: '2',
      chain_id: 'mumbai',
    },
    title: 'MadLabs Gathering',
    users: 2,
    posts: 6,
  },
]

const PageDashboard = () => {
  return (
   /*  <div className="bg-yellow-100 h-screen">
      <div className="grid gap-3 p-3">
        {items.map((item, index) => {
          return (
            <EventCard
              key={index}
              tokenAddress={item.token.token_address}
              chainId={item.token.chain_id}
              tokenId={item.token.token_id}
              title={item.title}
              onHandleShareClicked={() => {}}
              totalUser={item.users}
              totalPost={item.posts}
            />
          )
        })}
      </div>
    </div> */

    <div className="bg-white h-screen">
      <div className="grid gap-3 p-3">
        <div className='text-xl font-bold pt-4'>Happening now</div>
        {items.map((item, index) => {
          return (
            <EventCard
              key={index}
              tokenAddress={item.token.token_address}
              chainId={item.token.chain_id}
              tokenId={item.token.token_id}
              title={item.title}
              onHandleShareClicked={() => {}}
              totalUser={item.users}
              totalPost={item.posts}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PageDashboard
