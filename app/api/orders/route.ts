import { auth } from '~/config/auth';

import { NextRequest, NextResponse } from 'next/server';
import { createOrder, getAllOrders } from '~/services/orders';

export const GET = async function getAllOrdersHandler() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(await getAllOrders(session.user));
};

export const POST = async function createOrderHandler(req: NextRequest) {
  const body = await req.formData();
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const serviceId = body.get('serviceId');
  if (!serviceId) {
    return NextResponse.json(
      { error: 'Service ID is required' },
      { status: 400 }
    );
  }

  await createOrder(body, session.user);
  return NextResponse.json(null, { status: 201 });
};
