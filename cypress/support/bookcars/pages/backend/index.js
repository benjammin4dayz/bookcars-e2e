import { CarsPage } from './CarsPage';
import { CreateCarPage } from './CreateCarPage';
import { HomePage } from './HomePage';
import { SignInPage } from './SignInPage';

export const Cars = new CarsPage('/cars');
export const CreateCar = new CreateCarPage('/create-car');
export const Home = new HomePage('/');
export const SignIn = new SignInPage('/sign-in');
