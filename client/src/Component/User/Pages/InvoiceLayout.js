import React, { Component } from 'react';
import './invoiceLayout.css';

class InvoiceLayout extends Component {
  render() {
    return (
      <div id="invoiceLayout">
        <button>print this out</button>
        <div className="invoiceLayout_wrapper">
          <div className="invoiceLayout_heading">
            <div className="item1">
              <span>wellcom</span>
            </div>
            <div className="item2">
              <span className="name">
                mad_ecom
            </span>
              <h6>address</h6>
              <h6>phone</h6>
              <h6>email</h6>
            </div>
          </div>
          <div className="invoiceLayout_info">
            <div className="item1">
              <h6>INVOICE TO</h6>
              <span>user</span>
              <h6>address</h6>
              <p>email</p>
            </div>
            <div className="item2">
              <span>invoice id</span>
              <span>zhfkjsdhfsdjf32sddfs</span>
              <h6>date of invoice:today</h6>
            </div>
          </div>
          <div className="invoiceLayout_content">
            <div className="head">
              <div>#</div>
              <div>products</div>
              <div>quantity</div>
              <div>price</div>
              <div>total</div>
            </div>
            <div className="body">
              <div style={{ color: '#ffff', background: '#2EBFDA' }}>#</div>
              <div>
                <p>products name</p>
              </div>
              <div>
                <p>quantity</p>
              </div>
              <div>
                <p>price</p>
              </div>
              <div style={{ color: '#ffff', background: '#2EBFDA' }}>
                <p>total</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'uppercase', borderBottom: '2px solid #2EBFDA' }}>
              <p>subtotal</p>
              <p>1200 tk</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'uppercase', borderBottom: '2px solid #2EBFDA' }}>
              <p>tax</p>
              <p>12 tk</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textTransform: 'uppercase' }}>
              <p>grand total</p>
              <p>12 tk</p>
            </div>
          </div>
          <div style={{textAlign: 'center',borderLeft:'2px solid #2EBFDA',borderBottom: '1px solid #3333'}}>
              <p style={{textTransform: 'uppercase'}}>Notice</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique in eos harum, aut culpa beatae reprehenderit assumenda</p>
          </div>
          <p style={{textAlign: 'center'}}>notice was created on computer and is valid without signature and seal.</p>
        </div>
      </div>
    );
  }
}

export default InvoiceLayout;