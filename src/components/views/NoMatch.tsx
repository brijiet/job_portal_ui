const NoMatch = () => {
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center">
        <img src={`${process.env.REACT_APP_IMAGE_BASE_URL}pageNotFound1.jpg`} alt='pageNotFound1'  />
      </div>
    </div>
  )
}

export default NoMatch;