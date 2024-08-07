import { auth } from '~/config/auth';
import { addService } from '~/services/service';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (session?.user?.role != 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();

  try {
    await addService(body);
  } catch (error) {
    return NextResponse.json(
      { error: 'Bad Request', messgae: error },
      { status: 400 }
    );
  }

  return NextResponse.json(null, { status: 201 });
};
