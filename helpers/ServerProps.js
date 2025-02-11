// This file is for RBAC purpose - To show admin panel sidebar based on privileges

export default async function getServerSideProps({ req }) {
  // Role
  const role = req.cookies.role ? JSON.parse(req.cookies.role).role : null;
  // Privileges
  const privileges = req.cookies.role
    ? JSON.parse(req.cookies.role).privileges
    : [];

  return {
    props: { role, privileges },
  };
}
