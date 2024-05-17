import type { PageServerLoad } from './$types';


export function load({ cookies }) {
   
    let machine_id = cookies.get('machine_id');
   
  
    if (!machine_id) {
      machine_id = crypto.randomUUID();
      cookies.set('machine_id', machine_id, { path: '/' });
    }
  
    return {
      machine_id
    };
  }