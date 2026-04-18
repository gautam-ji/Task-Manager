
const AuthLayout = ({ children}) => {
  return (
    <div className='flex  h-screen overflow-hidden'>
        <div className='w-full md:w-1/2 overflow-y-auto my-auto '>
         <div className='min-h-full flex flex-col px-12 pt-8 pb-12'>
          <div className='flex items-center justify-center' >{children}</div>
         </div>
        </div>
       <div className='hidden md:block w-1/2'>
       <img src='https://media.istockphoto.com/id/626956870/photo/action-plan-concept-the-meeting-at-the-white-office-table.jpg?s=1024x1024&w=is&k=20&c=X92ozF4YOd0mR_LeBAdpE4vkoLtzLe-OktF7SxHEkT0=' alt='Login background'  className="h-full w-full object-cover"/>
       
       </div>
    </div>
  )
}

export default AuthLayout


