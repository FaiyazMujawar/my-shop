export const HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
    <style>
      * {
        font-family: 'Inter', sans-serif;
      }
      .bold {
        font-weight: bold;
      }
      .mb-2 {
        margin-bottom: 1rem;
      }
      .text-muted {
        color: #7a7e83;
      }
      .note {
        border: 1px solid #d9e2ed;
        padding: 10px;
        border-radius: 5px;
        margin: 10px 0;
      }
    </style>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
      rel="stylesheet"
    />
</head>
<body>
  {}
</body>
</html>
`;

export const ORDER_PLACED_USER = `
<div>
  <h3>Hi, {}</h3>
  <div>
    Congratulations! You have successfully placed your order for service
    <span class="bold">{}</span>. You will be notified once the
    admin approves your request.
  </div>
  <div class="mb-2">Thank you for using our service.</div>
  <div>
    <div>Regards</div>
    <span class="text-muted">{} Admin</span>
  </div>
</div>
`;

export const ORDER_PLACED_ADMIN = `
<div>
  <h3>Hi, Admin</h3>
  <div class="mb-2">
    A request has been submitted for service
    <span class="bold">{}</span> has been placed by
    <span class="bold">{} ({})</span>.
  </div>
  <div>
    <div>Regards</div>
    <span class="text-muted">{} System</span>
  </div>
</div>
`;

export const ORDER_CANCELLED = `
<div>
  <h3>Hi, Admin</h3>
  <div class="mb-2">
    The order with ID <span class="bold">{}</span> for service 
    <span class="bold">{}</span> has been cancelled by the user 
    <span class="bold">{} ({})</span>.
  </div>
  <div>
    <div>Regards</div>
    <span class="text-muted">{} System</span>
  </div>
</div>
`;

export const ORDER_ACCEPTED = `
<div>
  <h3>Hi, {}!</h3>
  <div>
    Congratulations! Your order with ID 
    <span class="bold">{}</span> for service <span class="bold">{}</span> has been accepted. Admin will now process the request. You will be notified once the
    request is processed.
  </div>
  <div class="mb-2">Thank you for using our service.</div>
  <div>
    <div>Regards</div>
    <span class="text-muted">{} Admin</span>
  </div>
</div>
`;

export const ORDER_REJECTED = `
<div>
  <h3>Hi, {}!</h3>
  <div>
    Unfortunately, your order with ID
    <span class="bold">{}</span> for service
    <span class="bold">{}</span> has been rejected. The admin has added the
    following note:
    <div class="note">
      {}
    </div>
  </div>
  <div class="mb-2">Thank you for using our service.</div>
  <div>
    <div>Regards</div>
    <span class="text-muted">{} Admin</span>
  </div>
</div>
`;

export const ORDER_PROCESSED = `
<div>
  <h3>Hi, {}!</h3>
  <div>
    Congratulations! Your order with ID 
    <span class="bold">{}</span> for service <span class="bold">{}</span> has been accepted. Admin will now process the request. You will be notified once the
    request is processed.
  </div>
  <div class="mb-2">Thank you for using our service.</div>
  <div>
    <div>Regards</div>
    <span class="text-muted">{} Admin</span>
  </div>
</div>
`;
