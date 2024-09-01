import User from "./User";
import UserClass from "./UserClass";

const About=()=>{
    return(
        <div className="about">
            <h1>About</h1>
            <h3>is about page</h3>
            <User name={"Surya Naik"} location={"Karnataka,India"} />

            <UserClass name={"Surya Naik"} location={"Karnataka,India"} />
        </div>
    )
}

export default About;