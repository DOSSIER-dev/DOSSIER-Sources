export interface Staffer {
  id?: number;
  user: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
  };
  isActive?: boolean;
  isManager?: boolean;
}
