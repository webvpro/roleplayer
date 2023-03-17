import { createAvatar } from '@dicebear/core';
import { lorelei, adventurer, adventurerNeutral, bottts, botttsNeutral, loreleiNeutral } from '@dicebear/collection';




export const useDiceBear = () => {
    async function getAvatar(){
        const avatar = createAvatar(lorelei, {
            seed: 'John Doe',
            // ... other options
          });
        const dataUrl = await avatar.toDataUri();     
        return dataUrl 
    }
    return { getAvatar }
}