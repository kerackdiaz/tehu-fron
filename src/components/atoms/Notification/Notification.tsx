

const Notification = () => {
  return (
    <div>
      <div className='relative cursor-pointer'>
        <img className="w-7" src={"../icon-notification.avif"} alt="Notification" title='Notification' />
        <span className='absolute top-[-15px] right-[-8px] bg-red-500 text-white font-semibold text-xs rounded-full py-1 px-2'>
          2
        </span>
      </div>
    </div>
  )
}

export default Notification