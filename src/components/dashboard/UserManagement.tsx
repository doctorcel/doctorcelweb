'use client';

import React, { useState, useEffect } from 'react';
import { User, Role } from '@prisma/client';

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: Role;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'SELLER',
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchUsers = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error fetching users');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const method = editingUserId ? 'PATCH' : 'POST';
      const body = editingUserId ? { ...formData, id: editingUserId } : formData;

      const response = await fetch('/api/user', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save user');
      }

      await fetchUsers();
      setFormData({ name: '', email: '', password: '', role: 'SELLER' });
      setEditingUserId(null);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error saving user');
    }
  };

  const handleEdit = (user: User) => {
    setFormData({ ...user, password: '' });
    setEditingUserId(user.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const token = getToken();
      if (!token) {
        throw new Error('No authentication token found');
      }
      const response = await fetch('/api/user', {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to delete user');
      await fetchUsers();
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error deleting user');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="mb-2 p-2 border rounded w-full"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="mb-2 p-2 border rounded w-full"
          required={!editingUserId}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="mb-2 p-2 border rounded w-full"
          required
        >
          <option value="ADMIN">Admin</option>
          <option value="SELLER">Seller</option>
          <option value="TECHNICIAN">Technician</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {editingUserId ? 'Update User' : 'Create User'}
        </button>
      </form>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user)} className="mr-2 text-blue-500">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)} className="text-red-500">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;