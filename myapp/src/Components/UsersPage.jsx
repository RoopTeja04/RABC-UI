import React, { useState } from "react";

const UsersPage = ({ roles, users, addUser }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    mobile: "",
    role: roles[0]?.name || "",
    status: "Active",
    permissions: roles[0]?.permissions || [],
  });

  const [editUser, setEditUser] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [permissionFilter, setPermissionFilter] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      const selectedRole = roles.find((role) => role.name === value);
      setFormState({
        ...formState,
        [name]: value,
        permissions: selectedRole?.permissions || [],
      });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === "role") {
      const selectedRole = roles.find((role) => role.name === value);
      setEditUser({
        ...editUser,
        [name]: value,
        permissions: selectedRole?.permissions || [],
      });
    } else {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedRole = roles.find((role) => role.name === formState.role);
    const newUser = {
      ...formState,
      id: Date.now(),
      permissions: selectedRole?.permissions || [],
    };

    addUser(newUser);
    setFormState({
      name: "",
      email: "",
      role: roles[0]?.name || "",
      status: "Active",
      permissions: roles[0]?.permissions || [],
    });
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    window.location.reload();
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSaveEdit = () => {
    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? editUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditUser(null);
    window.location.reload();
  };

  const filteredUsers = users.filter((user) => {
    const roleMatch = roleFilter ? user.role === roleFilter : true;
    const permissionMatch =
      permissionFilter && user.permissions.includes(permissionFilter)
        ? true
        : !permissionFilter;
    return roleMatch && permissionMatch;
  });

  return (
    <div className="permission">
      <h2 className="permission-head">Manage Users</h2>
    <div className="filter-container">
      <label htmlFor="roleFilter">Filter by Role:</label>
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">All Roles</option>
        {roles.map((role, index) => (
          <option key={index} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
      <label htmlFor="permissionFilter">Filter by Permission:</label>
      <select
        value={permissionFilter}
        onChange={(e) => setPermissionFilter(e.target.value)}
      >
        <option value="">All Permissions</option>
          {roles
            .flatMap((role) => role.permissions)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((permission, index) => (
              <option key={index} value={permission}>
                {permission}
              </option>
            ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-fields">
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={formState.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
          />
          <select name="role" value={formState.role} onChange={handleChange} required>
            {roles.map((role, index) => (
              <option key={index} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select name="status" value={formState.status} onChange={handleChange} required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <p className="permissions-display">Permissions: {formState.permissions.join(", ")}</p>
        <button type="submit" className="submit-button">Add User</button>
      </form>

      <table className="user-table">
        <thead>
          <tr className="table-header">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="table-row">
              {editUser && editUser.id === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditChange}
                      required
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleEditChange}
                      required
                      className="edit-input"
                    />
                  </td>
                  <td>
                    <select
                      name="role"
                      value={editUser.role}
                      onChange={handleEditChange}
                      required
                      className="edit-input"
                    >
                      {roles.map((role, index) => (
                        <option key={index} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{editUser.permissions.join(", ")}</td>
                  <td>
                    <select
                      name="status"
                      value={editUser.status}
                      onChange={handleEditChange}
                      required
                      className="edit-select"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                  <td>
                    <button className="save-button" onClick={handleSaveEdit}>Save</button>
                    <button className="cancel-button" onClick={() => setEditUser(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td data-label="Name">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Role">{user.role}</td>
                  <td data-label="Status">{user.status}</td>
                  <td data-label="Actions">
                    <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;