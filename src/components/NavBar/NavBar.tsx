import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from 'react-router-dom';

const PAGES = [
  {title: 'Our Services', id: 'services'},
  {title: 'Our Cases', id: 'cases'},
  {title: 'Our team', id: 'team'},
  {title: 'Careers with Us', id: 'career'},
  {title: 'About us', id: 'about'},
  {title: 'Contact Us', id: 'contacts'}
];

const NavBar = () => {
  const navigate = useNavigate();

  const handleMenuClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 5 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            color="inherit"
            component={NavLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none" }}
          >
            My site
          </Typography>
          {PAGES.map((category) => (
            <Button
              color='inherit'
              key={category.id}
              variant="text"
              sx={{ mb: 1 }}
              onClick={() => handleMenuClick(category.id)}
            >
              {category.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
