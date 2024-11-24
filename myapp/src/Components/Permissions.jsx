import React, { useState } from "react";

const Permissions = ({ permissions, addPermission, removePermission, updatePermission }) => {
  const [newPermission, setNewPermission] = useState("");
  const [editingPermission, setEditingPermission] = useState(null);
  const [editedPermission, setEditedPermission] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPermission.trim() && !permissions.includes(newPermission.trim())) {
      addPermission(newPermission.trim());
      setNewPermission("");
    }
  };

  const handleDeletePermission = (permission) => {
    removePermission(permission);
  };

  const startEditing = (permission) => {
    setEditingPermission(permission);
    setEditedPermission(permission);
  };

  const cancelEditing = () => {
    setEditingPermission(null);
    setEditedPermission("");
  };

  const saveEdit = () => {
    if (editedPermission.trim() && editedPermission !== editingPermission) {
      updatePermission(editingPermission, editedPermission.trim());
      setEditingPermission(null);
      setEditedPermission("");
    }
  };

  return (
    <div className="permission">
      <h2 className="permission-head">Manage Permissions</h2>
      <form onSubmit={handleSubmit} className="permission-form">
        <input
          type="text"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="Add Permission"
          required
          className="permission-form-input"
        />
        <button type="submit" className="permission-form-button">Add</button>
      </form>
      <table className="permissions-table">
        <thead className="table-header">
          <tr>
            <th>Permission</th>
            <th>Actions</th>
          </tr>
        </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index} className="table-row">
                <td>
                  {editingPermission === perm ? (
                    <>
                      <input
                        type="text"
                        value={editedPermission}
                        onChange={(e) => setEditedPermission(e.target.value)}
                        required
                        className="per-input"
                      />
                    </>
                  ) : (
                    perm
                  )}
                </td>
                <td>
                  {editingPermission === perm ? (
                    <>
                      <button onClick={saveEdit} className="edit-btn">Save</button>
                      <button onClick={cancelEditing} className="del-btn">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(perm)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeletePermission(perm)} className="del-btn">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;