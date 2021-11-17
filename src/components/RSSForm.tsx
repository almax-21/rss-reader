import React, { FC } from 'react';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';

const RSSForm: FC = () => {
	return (
		<Form>
			<Form.Group as={Row} className="mb-2">
				<Col md="9" className="text-dark">
					<FloatingLabel controlId="floatingInput" label="Ссылка RSS">
						<Form.Control
							className="rss-input pb-2 pt-4"
							placeholder="Введите ссылку RSS"
						/>
					</FloatingLabel>
				</Col>
				<Col xs="9" sm="5" md="3">
					<Button
						className="w-100 h-100"
						type="submit"
						variant="primary"
						size="lg"
					>
						Добавить
					</Button>
				</Col>
			</Form.Group>
			<Form.Text style={{ fontSize: 16 }}>
				Пример: https://ru.hexlet.io/lessons.rss
			</Form.Text>
		</Form>
	);
};

export default RSSForm;
