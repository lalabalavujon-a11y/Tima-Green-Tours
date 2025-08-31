import Container from '@/components/Container';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  return (
    <Container>
      <div className="py-14 prose max-w-none">
        <h1>About Tima Green Tours</h1>
        <p>
          Tima Green Tours is more than a tour company — we are guardians of
          culture and environment. Founded by local Fijians passionate about
          sustainable tourism, we connect travelers with authentic experiences
          that honor tradition and protect nature.
        </p>
        <h2>Our Mission</h2>
        <ul>
          <li>Share Fiji's vibrant culture with integrity.</li>
          <li>Protect natural landscapes for generations.</li>
          <li>Empower local communities through tourism.</li>
        </ul>
        <h2>Our Philosophy</h2>
        <p>
          Travel should enrich both the traveler and the host community. Every
          itinerary is co-created with local partners, ensuring fair pay,
          respectful engagement, and minimal environmental footprint.
        </p>
      </div>
    </Container>
  );
}
