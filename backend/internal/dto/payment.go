package dto

type PaymentDTO struct {
	Value       string `json:"value"`
	Description string `json:"description"`
}

type PaymentRequest struct {
	Amount       Amount       `json:"amount"`
	Description  string       `json:"description"`
	Confirmation Confirmation `json:"confirmation"`
	Capture      bool         `json:"capture"`
}

type Amount struct {
	Value    string `json:"value"`
	Currency string `json:"currency"`
}

type Confirmation struct {
	Type      string `json:"type"`
	ReturnURL string `json:"return_url"`
}

type ResponseConfiramtion struct {
	Type            string `json:"type"`
	ConfirmationURL string `json:"confirmation_url"`
}

type Recipient struct {
	AccountID string `json:"account_id"`
	GatewayID string `json:"gateway_id"`
}

type PaymentResponse struct {
	ID           string               `json:"id"`
	Status       string               `json:"status"`
	Amount       Amount               `json:"amount"`
	Description  string               `json:"description"`
	Recipient    Recipient            `json:"recipient"`
	CreatedAt    string               `json:"created_at"`
	Confirmation ResponseConfiramtion `json:"confirmation"`
	Test         bool                 `json:"test"`
	Paid         bool                 `json:"paid"`
	Refundable   bool                 `json:"refundable"`
	Metadata     interface{}          `json:"metadata"`
}
