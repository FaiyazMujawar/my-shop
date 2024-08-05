import { auth } from '@config/auth';
import { createService, getAllServices } from '@db/service';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  const session = await auth();
  if (!session) {
    NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return;
  }

  return NextResponse.json(await getAllServices(), { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (session?.user.role != 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();

  try {
    await createService(body);
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request', messgae: error },
      { status: 400 }
    );
  }

  return NextResponse.json(null, { status: 201 });
};
