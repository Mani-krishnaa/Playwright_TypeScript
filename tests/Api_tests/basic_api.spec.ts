import { test, expect } from '@playwright/test';

test.describe('API Testing', () => {
    const baseUrl = 'https://reqres.in/api';
    let user_id: string;

    test('GET - Fetch users list', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users?page=2`);
        console.log(await response.json());
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    test('POST - Create a user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                'Name': 'Mani',
                'Job': 'QA'
            },
            headers: {
                'Accept': 'application/json'
            }
        })
        console.log(await response.json());
        expect(response.status()).toBe(201);
        const res = await response.json();
        user_id = res.id;
    });

    test('PUT - Update a user', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/${user_id}`, {
            data: {
                'Name': 'Mani',
                'Job': 'QA'
            }
        });
    });

    test('DELETE - Remove a user', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/${user_id}`);
        expect(response.status()).toBe(204);
        expect(response.ok()).toBeTruthy();
    });
});
