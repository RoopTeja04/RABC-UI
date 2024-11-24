import React, { useState } from "react";

const Roles = ({ roles, permissions, setRoles }) => {
  const [formState, setFormState] = useState({
    name: "",
    selectedPermissions: [],
  });

  const [editRole, setEditRole] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "name") {
      setFormState({ ...formState, name: value });
    } else if (name === "permissions") {
      const updatedPermissions = checked
        ? [...formState.selectedPermissions, value]
        : formState.selectedPermissions.filter((perm) => perm !== value);

      setFormState({ ...formState, selectedPermissions: updatedPermissions });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name) {
      const newRole = { name: formState.name, permissions: formState.selectedPermissions };
      const updatedRoles = [...roles, newRole];
      setRoles(updatedRoles);
      localStorage.setItem("roles", JSON.stringify(updatedRoles));
      setFormState({ name: "", selectedPermissions: [] });
    }
  };

  const handleDelete = (roleName) => {
    const updatedRoles = roles.filter((role) => role.name !== roleName);
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  const handleEdit = (role) => {
    setEditRole({ ...role, originalName: role.name });
  };

  const handleEditChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "name") {
      setEditRole((prev) => ({ ...prev, name: value }));
    } else if (name === "permissions") {
      const updatedPermissions = checked
        ? [...editRole.permissions, value]
        : editRole.permissions.filter((perm) => perm !== value);

      setEditRole((prev) => ({ ...prev, permissions: updatedPermissions }));
    }
  };

  const handleSaveEdit = () => {
    const updatedRoles = roles.map((role) =>
      role.name === editRole.originalName ? editRole : role
    );
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
    setEditRole(null);
  };

  const handleCancelEdit = () => {
    setEditRole(null);
  };

  return (
    <div className="roles">
      <h2 className="permission-head">Manage Roles</h2>
      <form className="permission-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Role Name"
          required
          className="permission-form-input"
        />
        <div className="permissions-options">
          <h4>Permissions:</h4>
          {permissions.map((perm, index) => (
            <label key={index} className="role-input-check">
              <input
                type="checkbox"
                name="permissions"
                value={perm}
                onChange={handleChange}
                checked={formState.selectedPermissions.includes(perm)}
                className="role-check"
              />
              {perm}
            </label>
          ))}
        </div>
        <button className="permission-form-button" type="submit">Add</button>
      </form>

      <table className="roles-table">
        <thead className="table-header">
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={index} className="table-row">
              {editRole && editRole.originalName === role.name ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editRole.name}
                      onChange={handleEditChange}
                      required
                      className="per-input-role"
                    />
                  </td>
                  <td>
                    {permissions.map((perm, idx) => (
                      <label key={idx}>
                        <input
                          type="checkbox"
                          name="permissions"
                          value={perm}
                          onChange={handleEditChange}
                          checked={editRole.permissions.includes(perm)}
                        />
                        {perm}
                      </label>
                    ))}
                  </td>
                  <td>
                    <div className="buttons-role">
                    <button onClick={handleSaveEdit} className="edit-btn-role">Save</button>
                    <button onClick={handleCancelEdit} className="del-btn-role">Cancel</button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>{role.name}</td>
                  <td>{role.permissions.join(", ")}</td>
                  <td>
                    <div className="buttons-role">
                      <button onClick={() => handleEdit(role)} className="edit-btn-role">Edit</button>
                      <button onClick={() => handleDelete(role.name)} className="del-btn-role">Delete</button>
                    </div>
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

export default Roles;