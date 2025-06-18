export default function About() {
    return (
      <div>

        {/* Titles and Descriptions about Website */}
        <p 
        className="subtitle"
        style ={{
            position: 'absolute',
            top: '90px',
            left: '50%',
            transform: 'translateX(-50%)',
        }}
        >About Us</p>

        <p
        style ={{
            fontSize: '26px',
            position: 'absolute',
            top: '170px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            width: '1100px'
        }}
        >FindMyBank is your one-stop search tool for exploring over 27,000 U.S. banks 
        and financial institutions. Whether you're looking for a local credit union, a 
        national bank, or a specialized financial service provider, our platform makes 
        it easy to find and compare institutions based on location, size, and services 
        offered.</p>

        <p 
        className="subtitle"
        style ={{
            position: 'absolute',
            top: '300px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px'
        }}
        >Why We Built It</p>

        <p
        style ={{
            fontSize: '26px',
            position: 'absolute',
            top: '380px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px',
            width: '1100px'
        }}>
            Navigating the U.S. banking landscape can be overwhelming — especially 
            with so many institutions offering similar services. FindMyBank was built 
            to help users make faster, smarter decisions by providing clean, searchable 
            access to real banking data.
        </p>

        <p 
        className="subtitle"
        style ={{
            position: 'absolute',
            top: '480px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px'
        }}
        >Our Data</p>

        <p
        style ={{
            fontSize: '26px',
            position: 'absolute',
            top: '560px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px',
            width: '1100px'
        }}>
            We use public datasets from reliable sources like the Federal Deposit 
            Insurance Corporation (FDIC) and other government agencies to ensure accuracy 
            and comprehensiveness.
        </p>

        <p 
        className="subtitle"
        style ={{
            position: 'absolute',
            top: '630px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px'
        }}
        >What to Expect</p>

        <p
        style ={{
            fontSize: '26px',
            position: 'absolute',
            top: '690px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px'
        }}>
            <br />
            ✅ A powerful search tool by name, city, state, or ZIP
            <br />
            <br />
            ✅ Real-time filtering from verified data
            <br />
            <br />
            ✅ Insight into each bank’s profile, charter type, and history
            <br />
            <br />
            ✅ A user-friendly, modern design with transparency in mind
        </p>

        <p
        style ={{
            fontSize: '22px',
            position: 'absolute',
            top: '1000px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            maxWidth: '2000px'
        }}>
           Have feedback or ideas? Contact us — we'd love to hear from you.
        </p>

      </div>
    );
  }
  