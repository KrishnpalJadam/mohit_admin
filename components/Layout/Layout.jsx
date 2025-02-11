// ** Next, React And Locals Imports
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "@/graphql/Admins.js";
import { GET_SITE_SETTINGS } from "@/graphql/SiteSettings.js";
import { GET_HOMEPAGE } from "@/graphql/Homepage.js";
import { getSiteSettings } from "@/redux/slices/siteSettings.js";
import { getHomepage } from "@/redux/slices/homepage.js";
import CustomImage from "@/components/Image/CustomImage";
import useStyles from "./styles.js";

// ** MUI Imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Collapse from "@mui/material/Collapse";

// ** Third Party Imports
import { useQuery, useMutation } from "@apollo/client";
import { RxDashboard } from "react-icons/rx";
import { GrHomeRounded, GrNote } from "react-icons/gr";
import { FiSettings, FiUsers } from "react-icons/fi";
import { BsBox2 } from "react-icons/bs";
import {
  RiLockPasswordLine,
  RiLogoutCircleRLine,
  RiMenu2Line,
  RiCoupon3Line,
  RiAdminLine,
} from "react-icons/ri";
import { AiOutlineRight } from "react-icons/ai";
import {
  MdExpandMore,
  MdExpandLess,
  MdOutlineLocalShipping,
} from "react-icons/md";
import { BiStoreAlt } from "react-icons/bi";

function Layout({ page, role, privileges }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  // States
  const [adminsDropDown, setAdminsDropDown] = useState(false);
  const [storeDropDown, setStoreDropDown] = useState(false);
  const [homeDropDown, setHomeDropDown] = useState(false);
  const [siteDropDown, setSiteDropDown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Drawer width
  const drawerWidth = parseInt(process.env.NEXT_PUBLIC_DRAWER_WIDTH);

  const handleDropDown = (menu) => {
    switch (menu) {
      case "adminsDropDown":
        setAdminsDropDown(!adminsDropDown);
        break;
      case "storeDropDown":
        setStoreDropDown(!storeDropDown);
        break;
      case "homeDropDown":
        setHomeDropDown(!homeDropDown);
        break;
      case "siteDropDown":
        setSiteDropDown(!siteDropDown);
        break;
      default:
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //  Queries
  const { data: siteSettingsData } = useQuery(GET_SITE_SETTINGS);
  const { data: homepageData } = useQuery(GET_HOMEPAGE);

  useEffect(() => {
    const siteSettings = siteSettingsData?.getSiteSettings;
    const homepage = homepageData?.getHomepage;

    if (siteSettings) {
      dispatch(getSiteSettings(siteSettings));
    }

    if (homepage) {
      dispatch(getHomepage(homepage));
    }
  }, [siteSettingsData, homepageData]);

  // Website logo
  const websiteLogo = useSelector(
    (state) => state.siteSettings.siteSettings?.logo
  );

  // To logout the admin
  const handleLogout = () => {
    logout();
  };

  const [logout] = useMutation(LOGOUT, {
    onCompleted(data) {
      if (data.logout.status === 200) {
        router.push("/login");
      }
    },
  });

  // To show sidebar based on admin privileges
  const isAllowed = (pathname) => {
    // Showing entire menu to superAdmin
    if (role === "superAdmin") {
      return true;
    }

    return privileges?.includes(pathname);
  };

  const drawer = (
    <div className={classes.drawer}>
      <div className={classes.logo}>
        <Link href="/">
          {websiteLogo && (
            <div>
              <CustomImage
                src={`${
                  process.env.NEXT_PUBLIC_BACKEND_URL + "logos/" + websiteLogo
                }`}
                alt="website logo"
                width={120}
                height={50}
              />
              <Typography variant="h6">
                {process.env.NEXT_PUBLIC_FABYOH_VERSION}
              </Typography>
            </div>
          )}
        </Link>
      </div>
      <Divider />
      <List>
        {/* Dashboard */}
        {isAllowed("/") && (
          <Link href="/">
            <ListItem key="Dashboard">
              <ListItemIcon>
                <RxDashboard className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Dashboard</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
        {/* Manage admins */}
        {isAllowed("/admins") && (
          <>
            <ListItem onClick={() => handleDropDown("adminsDropDown")}>
              <ListItemIcon>
                <RiAdminLine className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Manage Admins</Typography>}
                className={classes.sidebarText}
              />
              {adminsDropDown ? <MdExpandLess /> : <MdExpandMore />}
            </ListItem>
            <Collapse in={adminsDropDown} timeout="auto" unmountOnExit>
              <Link href="/admins/all">
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AiOutlineRight />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">Admins</Typography>}
                    className={classes.sidebarText}
                  />
                </ListItem>
              </Link>
              <Link href="/admins/roles">
                <ListItem sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AiOutlineRight />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6">Roles</Typography>}
                    className={classes.sidebarText}
                  />
                </ListItem>
              </Link>
            </Collapse>
          </>
        )}
        {/* Order Management */}
        {isAllowed("/orders") && (
          <Link href="/orders/all">
            <ListItem key="Order Management">
              <ListItemIcon>
                <BsBox2 className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Order Management</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
        {/* Store Management */}
        {isAllowed("/products") && (
          <ListItem onClick={() => handleDropDown("storeDropDown")}>
            <ListItemIcon>
              <BiStoreAlt className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Store Management</Typography>}
              className={classes.sidebarText}
            />
            {storeDropDown ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
        )}
        <Collapse in={storeDropDown} timeout="auto" unmountOnExit>
          <Link href="/products/all">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Products</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/products/categories">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">Product Categories</Typography>
                }
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/products/variants">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Product Variants</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/products/cards">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">Product Card Type</Typography>
                }
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        </Collapse>
        {/* Customer Management */}
        {isAllowed("/customers") && (
          <Link href="/customers/all">
            <ListItem key="Customer Management">
              <ListItemIcon>
                <FiUsers className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">Customer Management</Typography>
                }
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
        {/* Homepage Settings */}
        {isAllowed("/homepage-settings") && (
          <ListItem onClick={() => handleDropDown("homeDropDown")}>
            <ListItemIcon>
              <GrHomeRounded className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Homepage Settings</Typography>}
              className={classes.sidebarText}
            />
            {homeDropDown ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
        )}
        <Collapse in={homeDropDown} timeout="auto" unmountOnExit>
          <Link href="/homepage-settings/page-1">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Hero</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-2">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Marquee</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-3">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Sub Hero</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-4">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Risk Reducers</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-5">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Spotlight</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-6">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Shop By Category</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-7">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Newsletter</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/homepage-settings/page-8">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">Trending Products</Typography>
                }
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        </Collapse>
        {/* Site Settings */}
        {isAllowed("/site-settings") && (
          <ListItem onClick={() => handleDropDown("siteDropDown")}>
            <ListItemIcon>
              <FiSettings className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">Site Settings</Typography>}
              className={classes.sidebarText}
            />
            {siteDropDown ? <MdExpandLess /> : <MdExpandMore />}
          </ListItem>
        )}
        <Collapse in={siteDropDown} timeout="auto" unmountOnExit>
          <Link href="/site-settings/page-1">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Logos</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-2">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Topbar</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-3">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">Header & Footer Layout</Typography>
                }
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-4">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Socials</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-5">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Payment Methods</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-6">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Customer Views</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-7">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Sold In Last</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-8">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Countdown</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
          <Link href="/site-settings/page-9">
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <AiOutlineRight />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Hot Stock</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        </Collapse>
        {/* Shipping */}
        {isAllowed("/shipping") && (
          <Link href="/shipping">
            <ListItem key="Shipping">
              <ListItemIcon>
                <MdOutlineLocalShipping className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Shipping</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
        {/* Coupons*/}
        {isAllowed("/coupons") && (
          <Link href="/coupons">
            <ListItem key="Coupons">
              <ListItemIcon>
                <RiCoupon3Line className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Coupons</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
        {/* Static Pages */}
        {isAllowed("/static-pages") && (
          <Link href="/static-pages/all">
            <ListItem key="Static Pages">
              <ListItemIcon>
                <GrNote className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Static Pages</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
        {/* Change Password */}
        {isAllowed("/change-password") && (
          <Link href="/change-password">
            <ListItem key="Change Password">
              <ListItemIcon>
                <RiLockPasswordLine className={classes.sidebarIcon} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">Change Password</Typography>}
                className={classes.sidebarText}
              />
            </ListItem>
          </Link>
        )}
      </List>
    </div>
  );

  const container =
    typeof window !== "undefined" ? () => window.document.body : undefined;

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }}
          className={classes.appBar}
        >
          <Toolbar
            sx={{
              display: { md: "flex" },
              justifyContent: {
                xs: "space-between",
                md: "flex-end",
              },
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <RiMenu2Line className={classes.sidebarIcon} />
            </IconButton>
            <div className={classes.logout} onClick={handleLogout}>
              <Typography variant="h5">
                Logout <RiLogoutCircleRLine />
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Toolbar />
      </Box>
      {/* Page */}
      <div className={classes.children}>{page}</div>
    </div>
  );
}

export default Layout;
