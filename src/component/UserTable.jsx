import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Button,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import ViewUserModal from './ViewUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const UserTable = () => {
  const [users, setUsers] = useState([]); // Ensure this starts as an array
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/getUsers');
        const result = await response.json();
        
        // Check if the response contains the expected structure
        if (result.data && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          console.error('Unexpected response structure:', result);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedUser(null);
    setViewModalOpen(false);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setEditModalOpen(false);
  };

  const openDeleteModal = (userId) => {
    setSelectedUser(userId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setDeleteModalOpen(false);
  };

  const handleUserUpdated = () => {
    closeEditModal();
    fetchUsers(); // Ensure this is defined
  };

  const handleUserDeleted = () => {
    closeDeleteModal();
    fetchUsers(); // Ensure this is defined
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', margin: '20px 0' }}>
      <Typography variant="h5" sx={{ p: 2, textAlign: 'center' }}>User Management</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'phone'}
                  direction={orderBy === 'phone' ? order : 'asc'}
                  onClick={() => handleRequestSort('phone')}
                >
                  Phone Number
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort((a, b) => {
                if (order === 'asc') {
                  return a[orderBy] < b[orderBy] ? -1 : 1;
                }
                return a[orderBy] > b[orderBy] ? -1 : 1;
              })
              .map(user => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell> 
                  <TableCell>
                    <Box display="flex" justifyContent="space-around">
                      <Button variant="outlined" size="small" onClick={() => openViewModal(user)}>View</Button>
                      <Button variant="outlined" size="small" onClick={() => openEditModal(user)}>Edit</Button>
                      <Button variant="outlined" size="small" color="error" onClick={() => openDeleteModal(user.id)}>Delete</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ViewUserModal
        isOpen={viewModalOpen}
        toggle={closeViewModal}
        user={selectedUser}
      />
      <EditUserModal
        isOpen={editModalOpen}
        toggle={closeEditModal}
        user={selectedUser}
        onSave={handleUserUpdated}
      />
      <DeleteUserModal
        isOpen={deleteModalOpen}
        toggle={closeDeleteModal}
        userId={selectedUser}
        onDelete={handleUserDeleted}
      />
    </Paper>
  );
};

export default UserTable;
