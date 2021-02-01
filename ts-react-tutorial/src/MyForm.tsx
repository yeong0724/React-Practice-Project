/* TypeScript - useState */
import React, { useState } from 'react';

type MyFormProps = {
    onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
    const [form, setForm] = useState({
        name: '',
        description: '',
    });

    const { name, description } = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //submit할시 자동으로 page가 새로고침되는걸 방지해주는 함수
        onSubmit(form);
        setForm({
            name: '',
            description: '',
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={name} onChange={onChange} />
            <input name="description" value={description} onChange={onChange} />
            <button type="submit">등록</button>
        </form>
    );
}

export default MyForm;
