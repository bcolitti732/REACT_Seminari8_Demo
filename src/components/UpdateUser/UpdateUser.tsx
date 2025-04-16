import React, { useState } from 'react';
import { User } from '../../types';
import styles from './UpdateUser.module.css';

interface Props {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onCancel: () => void;
}

const UpdateUser: React.FC<Props> = ({ user, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState<User>({ ...user });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'age' ? parseInt(value) : value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <h2 className={styles.heading}>Edit User</h2>

            <div className={styles.form}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Name:</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Age:</label>
                    <input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>

                <div className={styles.buttonGroup}>
                    <button type="submit" className={`${styles.button} ${styles.saveBtn}`}>Update</button>
                    <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancelBtn}`}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export default UpdateUser;
