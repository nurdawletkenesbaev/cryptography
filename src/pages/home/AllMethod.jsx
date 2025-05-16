import { Link } from 'react-router-dom'

const AllMethod = () => {
  const methods = [
    {
      path: '/first',
      name: 'Keste almastırıw usılı',
      id: '1',
    },
    {
      path: '/cezar',
      name: 'Cezar shifrlaw usılı',
      id: '2',
    },
    {
      path: '/vijiner',
      name: 'Vijiner shifrlaw usılı',
      id: '3',
    },
    {
      path: '/magic-square',
      name: 'Sıyqırlı kvadrat usılı',
      id: '4',
    },
    {
      path: '/cezar-affin',
      name: 'Cezardıń affin usılı',
      id: '5',
    },
  ]
  return (
    <div className='flex justify-center flex-col items-center py-[50px] border-t-[1px] border-b-[1px] border-[#00ff00]'>
      <h1 className='text-center text-[30px] text-white  mb-[30px]'>
        Kriptografiyalıq usıllar
      </h1>
      <div className='flex flex-col gap-[3px] items-center w-full max-w-[500px] bg-black opacity-75'>
        {methods.map((item, index) => (
          <Link
            key={item.id}
            className='link w-full text-center border-0-important rounded-sm'
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AllMethod
