const UsersList = ({ users, filter }) => {
  return (
    <ul className="users">
      {users.map((obj) => (
        <li key={obj.id} className="users__item">
          <div className="users__item-name">{obj.name}</div>
          <div className="users__item-email">{obj.email}</div>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
