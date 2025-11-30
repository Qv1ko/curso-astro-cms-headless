import { defineAction } from 'astro:actions';
import { FROM_EMAIL, RESEND_API_KEY, TO_EMAIL } from 'astro:env/server';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import type { LikesResponse } from './model';
import { addLike, getLikes } from './repository';

const resend = new Resend(RESEND_API_KEY);

export const server = {
    addLike: defineAction<LikesResponse>({
        async handler(slug) {
            return { likes: await addLike(slug) }
        },
    }),
    getLikes: defineAction<LikesResponse>({
        async handler(slug) {
            return { likes: await getLikes(slug) }
        },
    }),
    sendSubscription: defineAction({
        accept: 'form',
        input: z.object({
            email: z.string().email('Invalid email'),
        }),
        handler: async input => {
            try {
                const { email } = input;
                await resend.emails.send({
                    from: FROM_EMAIL,
                    to: TO_EMAIL,
                    subject: 'Hello World',
                    html: `<p>Congrats on sending your <strong>${email}</strong>!</p>`,
                });
                return { success: true, message: 'E-mail sent successfully ✅' };
            } catch (_) {
                return { success: false, message: 'There was an error sending the e-mail ❌' };
            }
        },
    }),
}