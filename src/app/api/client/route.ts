import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(request: NextRequest) {
    console.log('POST request received in /api/client');
    try {
        const body = await request.json();
        console.log('Received client data:', body);

        const newClient = await prisma.client.create({
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
                address: body.address,
                taxId: body.taxId,
                documentType: body.documentType,
                document: body.document,
                personType: body.personType,
                regime: body.regime,
                country: body.country,
                department: body.department,
                city: body.city,
            }
        });

        console.log('Created client:', newClient);
        return NextResponse.json(newClient, { status: 201 });
    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json(
            { error: 'Error creating client', message: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET() {
    console.log('GET request received in /api/client');
    try {
        const clients = await prisma.client.findMany();
        console.log('Fetched clients:', clients.length);
        return NextResponse.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Error fetching clients' }, { status: 500 });
    }
}