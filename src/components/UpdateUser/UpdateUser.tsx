import React, { useState } from 'react';
import { User } from '../../types';
import styles from './UpdateUser.module.css';
import { updateUser } from '../../services/usersService';

interface Props {
    user: User;
    onUpdate: (updatedUser: User) => void;
    onCancel: () => void;
}

const UpdateUser: React.FC<Props> = ({ user, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState<User>({ ...user });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? parseInt(value) : value,
        }));
    };    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const updated = await updateUser(formData);
            onUpdate(updated);
        } catch (err) {
            console.error('Update failed:', err);
            setError('Could not update user.');
        } finally {
            setLoading(false);
        }
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
                        disabled={loading}
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
                        disabled={loading}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email:</label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        disabled={loading}
                    />
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className={styles.buttonGroup}>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.saveBtn}`}
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className={`${styles.button} ${styles.cancelBtn}`}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
};

export default UpdateUser;
