import React, { FC, useState } from 'react';
import { Context } from '..';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

const LogForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [role,setRole]=useState<string>("user");
    const { store } = useContext(Context);

    const handleRegistration = async () => {
        await store.registration(email, password, firstName, lastName,role);
        setFirstName('');
        setLastName('');
        store.login(email, password);
    };


    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                placeholder="First Name"
            />
            <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                placeholder="Last Name"
            />
            <div>
                <input type="radio" value="psychologist" name="role" checked={role!=="user"} onClick={()=>setRole("psychologist")}/>
                <label htmlFor="psychologist"> Я психолог</label>
                <input type="radio" value="user" name="role" checked={role==="user"} onClick={()=>setRole("user")}/>
                <label htmlFor="user">Я простой смертный</label>
            </div>
            <button onClick={() => store.login(email, password)}>Логин</button>
            <button onClick={handleRegistration}>Регистрация</button> {/* Используется метод handleRegistration */}
        </div>
    );
};

export default observer(LogForm);


//<button onClick={()=>store.registration(email,password,firstName,lastName)}>Регистрация</button>