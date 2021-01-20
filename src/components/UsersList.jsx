const UsersList = ({ users, filter }) => {
  return (
    <ul className="users">
      {users
        .filter(
          (obj) =>
            obj.name.toLowerCase().includes(filter.toLowerCase()) ||
            obj.email.toLowerCase().includes(filter.toLowerCase()),
        )
        .map((obj) => (
          <li key={obj.id} className="users__item">
            <div className="users__item-name">{obj.name}</div>
            <div className="users__item-email">{obj.email}</div>
          </li>
        ))}
    </ul>
  );
};

export default UsersList;
