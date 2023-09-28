export type StripeEvent = {
    id: string;
    object: string;
    api_version: string;
    created: number;
    data: {
        object: CheckoutSession;
    };
    livemode: boolean;
    pending_webhooks: number;
    request: {
        id: string | null;
        idempotency_key: string | null;
    };
    type: string;
};

type CheckoutSession = {
    id: string;
    object: string;
    after_expiration: null;
    allow_promotion_codes: null;
    amount_subtotal: number;
    amount_total: number;
    automatic_tax: {
        enabled: boolean;
        status: null;
    };
    billing_address_collection: string;
    cancel_url: string;
    client_reference_id: null;
    consent: null;
    consent_collection: null;
    created: number;
    currency: string;
    currency_conversion: null;
    custom_fields: any[];
    custom_text: {
        shipping_address: null;
        submit: null;
        terms_of_service_acceptance: null;
    };
    customer: null;
    customer_creation: string;
    customer_details: CustomerDetails;
    customer_email: null;
    expires_at: number;
    invoice: null;
    invoice_creation: {
        enabled: boolean;
        invoice_data: InvoiceData;
    };
    livemode: boolean;
    locale: null;
    metadata: {
            productId: string,
            quantity: string
    };
    mode: string;
    payment_intent: string;
    payment_link: null;
    payment_method_collection: string;
    payment_method_configuration_details: {
        id: string;
        parent: null;
    };
    payment_method_options: Record<string, any>;
    payment_method_types: string[];
    payment_status: string;
    phone_number_collection: {
        enabled: boolean;
    };
    recovered_from: null;
    setup_intent: null;
    shipping_address_collection: {
        allowed_countries: string[];
    };
    shipping_cost: null;
    shipping_details: ShippingDetails;
    shipping_options: any[];
    status: string;
    submit_type: null;
    subscription: null;
    success_url: string;
    total_details: {
        amount_discount: number;
        amount_shipping: number;
        amount_tax: number;
    };
    url: null;
};

type CustomerDetails = {
    address: Address;
    email: string;
    name: string;
    phone: string;
    tax_exempt: string;
    tax_ids: any[];
};

type Address = {
    city: string;
    country: string;
    line1: string;
    line2: string | null;
    postal_code: string;
    state: string | null;
};

type InvoiceData = {
    account_tax_ids: null;
    custom_fields: null;
    description: null;
    footer: null;
    metadata: Record<string, any>;
    rendering_options: null;
};

type ShippingDetails = {
    address: Address;
    name: string;
};
