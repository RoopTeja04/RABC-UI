import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Components/HomePage";
import UsersPage from "./Components/UsersPage";
import Roles from "./Components/Roles";
import Permissions from "./Components/Permissions";

const Layout = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Default permissions and roles
    const defaultPermissions = ["Read", "Write", "Delete"];
    const defaultRoles = [
      { name: "Admin", permissions: ["Read", "Write", "Delete"] },
      { name: "Viewer", permissions: ["Read"] },
      { name: "Editor", permissions: ["Read", "Write"] },
    ];

    const savedPermissions =
      JSON.parse(localStorage.getItem("permissions")) || [];
    const savedRoles = JSON.parse(localStorage.getItem("roles")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (savedPermissions.length === 0) {
      setPermissions(defaultPermissions);
      localStorage.setItem("permissions", JSON.stringify(defaultPermissions));
    } else {
      setPermissions(savedPermissions);
    }

    if (savedRoles.length === 0) {
      setRoles(defaultRoles);
      localStorage.setItem("roles", JSON.stringify(defaultRoles));
    } else {
      setRoles(savedRoles);
    }

    setUsers(savedUsers); 
  }, []);

  const addPermission = (permission) => {
    if (!permissions.includes(permission)) {
      const updatedPermissions = [...permissions, permission];
      setPermissions(updatedPermissions);
      localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    }
  };

  const removePermission = (permission) => {
    const updatedPermissions = permissions.filter((perm) => perm !== permission);
    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));

    const updatedRoles = roles.map((role) => ({
      ...role,
      permissions: role.permissions.filter((perm) => perm !== permission),
    }));
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  const addRole = (role) => {
    const updatedRoles = [...roles, role];
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  const addUser = (user) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updatePermission = (oldPermission, newPermission) => {
    const updatedPermissions = permissions.map((perm) =>
      perm === oldPermission ? newPermission : perm
    );
    setPermissions(updatedPermissions);
    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));

    const updatedRoles = roles.map((role) => ({
      ...role,
      permissions: role.permissions.map((perm) =>
        perm === oldPermission ? newPermission : perm
      ),
    }));
    setRoles(updatedRoles);
    localStorage.setItem("roles", JSON.stringify(updatedRoles));
  };

  return (
    <>
      <nav className="tabs-menu">
        <Link to="/" className="tabs-head">
          RBAC
        </Link>
        <div className="tab-view">
          <Link to="/userpage" className="tabs">
            Users
          </Link>
          <Link to="/roles" className="tabs">
            Roles
          </Link>
          <Link to="/permissions" className="tabs">
            Permissions
          </Link>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/userpage"
            element={
              <UsersPage
                roles={roles}
                users={users}
                addUser={addUser}
              />
            }
          />
          <Route
            path="/roles"
            element={
              <Roles
                roles={roles}
                permissions={permissions}
                setRoles={setRoles}
              />
            }
          />
          <Route
            path="/permissions"
            element={
              <Permissions
                permissions={permissions}
                addPermission={addPermission}
                removePermission={removePermission}
                updatePermission={updatePermission}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Layout;