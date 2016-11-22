import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Avatar } from 'material-ui';
import Editable from 'react-edit-inline';

const Contact = ({ contacts, params, handleEditContact }) => {
  const contact = _.find(contacts, { id: +params.id });

  return (
    <div>
      <div>
        <Avatar src={contact.avatar} size={160} />
        <div>
          <h1>
            {<Editable
              className="editable"
              text={contact.name}
              paramName="name"
              change={data => handleEditContact(contact.id, data)}
            />}
          </h1>
          <p>Username:&nbsp;
            {<Editable
              className="editable"
              text={contact.username}
              paramName="username"
              change={data => handleEditContact(contact.id, data)}
            />}
          </p>
          <p>
            Email:&nbsp;
            {<Editable
              className="editable"
              text={contact.email}
              paramName="email"
              change={data => handleEditContact(contact.id, data)}
            />}
          </p>
          <p>
            Phone:&nbsp;
            {<Editable
              className="editable"
              text={contact.phone}
              paramName="phone"
              change={data => handleEditContact(contact.id, data)}
            />}
          </p>
          <p>
            Website:&nbsp;
            {<Editable
              className="editable"
              text={contact.website}
              paramName="website"
              change={data => handleEditContact(contact.id, data)}
            />}
          </p>
        </div>
      </div>

      <h2>Address info</h2>
      <p>
        City:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.city}
          paramName="city"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        Country:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.country}
          paramName="country"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        State:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.state}
          paramName="state"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        Street A:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.streetA}
          paramName="streetA"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        Street B:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.streetB}
          paramName="streetB"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        Street C:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.streetC}
          paramName="streetC"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        Street D:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.streetD}
          paramName="streetD"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>
      <p>
        Zipcode:&nbsp;
        {<Editable
          className="editable"
          text={contact.address.zipcode}
          paramName="zipcode"
          change={data => handleEditContact(contact.id, data, 'address')}
        />}
      </p>

      <h2>Company info</h2>
      <p>
        Name:&nbsp;
        {<Editable
          className="editable"
          text={contact.company.name}
          paramName="name"
          change={data => handleEditContact(contact.id, data, 'company')}
        />}
      </p>
      <p>
        Catch phrase:&nbsp;
        {<Editable
          className="editable"
          text={contact.company.catchPhrase}
          paramName="catchPhrase"
          change={data => handleEditContact(contact.id, data, 'company')}
        />}
      </p>
      <p>
        BS:&nbsp;
        {<Editable
          className="editable"
          text={contact.company.bs}
          paramName="bs"
          change={data => handleEditContact(contact.id, data, 'company')}
        />}
      </p>
    </div>
  );
};

Contact.propTypes = {
  contacts: PropTypes.array,
  params: PropTypes.object,
  handleEditContact: PropTypes.func
};

export default Contact;
