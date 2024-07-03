import { HomePage } from './HomePage';
import { LocationsPage } from './LocationsPage';
import { SearchPage } from './SearchPage';
import { SignInPage } from './SignInPage';
import { SuppliersPage } from './SuppliersPage';

export const Home = new HomePage('/');
export const Locations = new LocationsPage('/locations');
export const Search = new SearchPage('/search');
export const SignIn = new SignInPage('/sign-in');
export const Suppliers = new SuppliersPage('/suppliers');
