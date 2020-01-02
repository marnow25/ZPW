import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs/index';
import { User } from '../models/user';
import { User as fbUser } from 'firebase';
import { Role } from '../models/role';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Credentials {
  email: string;
  password: string;
 }

 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  readonly authState$: Observable<fbUser | null> = this.fireAuthentication.authState;
  private usersRolesCollection: AngularFirestoreCollection<Role>;
  user: User;

  constructor(private fireAuthentication: AngularFireAuth, private database: AngularFirestore) { 
    this.usersRolesCollection = this.database.collection<Role>('usersRoles');
    this.setUser();
  }

  setUser() {
    this.authState$.subscribe(u => {
       if (u) {
        this.database.doc<Role>(`/usersRoles/${u.uid}`).valueChanges()
                        .subscribe((userRole: Role) => { this.user = {email: u.email, uid: u.uid, role: userRole} as User; });
       }
    });
  }

  getUserId(): string | null {
    return (this.fireAuthentication.auth.currentUser ? this.fireAuthentication.auth.currentUser.uid : null);
   }
 
   getUser(): User | null {
     return this.user;
   }
 
   isAdmin(): boolean {
     return this.user && this.user.role && this.user.role.role === 'admin';
   }

   login({email, password}: Credentials) {
    const session = auth.Auth.Persistence.SESSION;
    return this.fireAuthentication.auth.setPersistence(session).then(() => {
     return this.fireAuthentication.auth.signInWithEmailAndPassword(email, password).then(res => this.setUser());
    });
 }


 register({email, password}: Credentials) {
   return this.fireAuthentication.auth.createUserWithEmailAndPassword(email, password);
 }

 logout() {
   this.user = null;
   return this.fireAuthentication.auth.signOut();
 }
}
