export interface Route {
  path: string;
  name: string;
}

export const routes: Route[] = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/create-drop',
    name: 'Create drop',
  },
];
