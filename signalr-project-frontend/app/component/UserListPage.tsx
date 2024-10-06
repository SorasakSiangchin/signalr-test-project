"use client"

import React, { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr';
import { User } from '../Interfaces/user';
import Form from 'react-bootstrap/Form';
import { Button, Card } from 'react-bootstrap';
const UserListPage = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [users, setUsers] = useState<User[]>([])
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://localhost:7231/api/User');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setUsers([])
            }
        };

        fetchData();
    }, [])

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7231/userHub/')
            .build();

        // ใช้เพื่อฟังเหตุการณ์ต่างๆ เช่น การเชื่อมต่อ, การรับข้อความ, หรือการตัดการเชื่อมต่อ
        newConnection.on('ReceiveUsers', (users: User[]) => {
            setUsers(users);
        });

        newConnection.start()
            .then(() => console.log('Connection started'))
            .catch(err => console.error('Error while starting connection: ', err));

        setConnection(newConnection);

    }, []);


    const handleChangeName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(event.target.value);
    };

    const handleChangeEmail = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const data: User = {
            email,
            name,
            password
        }
        connection?.send('AddUser', data);
        setName('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className='flex gap-3'>
            <Form className='w-[70%] ' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="name" value={name} onChange={handleChangeName} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="email" value={email} onChange={handleChangeEmail} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="password" value={password} onChange={handleChangePassword} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Card className='w-[30%] h-full'>
                <Card.Body>
                    <Card.Title>User List</Card.Title>
                    <Card.Text>
                        {users.map((user, index) => (
                            <div key={index}>
                                <div>
                                    <p>
                                        ชื่อ : {user.name}
                                    </p>
                                    <p>
                                        อีเมล : {user.email}
                                    </p>
                                    <p>
                                        รหัสผ่าน : {user.password}
                                    </p>
                                </div>
                                {users.length > 1 && <hr className='my-3' />}
                            </div>
                        ))}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserListPage