import React from 'react'

const Alert = (props) => {

    /*setTimeout(() => {
        setmsg(
            {
                message: ""
            }
        )
    }, 2000);

    const m = {
        message: "hi its yash"
    }

    const [msg, setmsg] = useState(m)*/
    return (
        <div>
            <div className="alert alert-primary" role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
