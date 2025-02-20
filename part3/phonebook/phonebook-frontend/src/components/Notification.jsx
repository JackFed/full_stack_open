const Notification = ({ message }) => {

    if (message === null) {
        return null;
    } else {
        return ( <h1 className='noti'>{message}</h1>)
    }    
}

export default Notification;