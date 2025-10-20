import { useContext, useCallback } from 'react';
import { UserContext } from '../context/UserContext';
import { userService } from '../services/userService';

export const useUsers = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }

    const { users ,loading, error, setUsers, setLoading, setError } = context;

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getAllUsers();
            setUsers(data);
            return data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setUsers, setLoading, setError]);

    const fetchUserById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const data = await userService.getUserById(id);
            return data;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]);

    const createUser = useCallback(async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const newUser = await userService.createUser(userData);
            await fetchUsers();
            // setUsers((prevUsers) => [...prevUsers, newUser]);
            return newUser;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]);

    const updateUser = useCallback(async (id, userData) => {
        try {
            setLoading(true);
            setError(null);
            const updatedUser = await userService.updateUser(id, userData);
            await fetchUsers();
            // setUsers((prevUsers) =>
            //     prevUsers.map((user) => (user.id === id ? updatedUser : user))
            // );
            return updatedUser;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]);

    const deleteUser = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            await userService.deleteUser(id);
            // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            await fetchUsers();
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]);

    const deleteAllUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await userService.deleteAllUsers();
            // setUsers([]);
            await fetchUsers();
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [setLoading, setError]); 

    return { users, loading, error, fetchUsers, fetchUserById, createUser, updateUser, deleteUser, deleteAllUsers };
}