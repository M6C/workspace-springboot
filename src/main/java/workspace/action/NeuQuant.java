// Decompiled by Jad v1.5.8g. Copyright 2001 Pavel Kouznetsov.
// Jad home page: http://www.kpdus.com/jad.html
// Decompiler options: packimports(3) 
// Source File Name:   NeuQuant.java

package workspace.action;

import java.awt.Color;
import java.awt.Image;
import java.awt.image.ImageObserver;
import java.awt.image.PixelGrabber;
import java.io.*;

public class NeuQuant
{

    public NeuQuant(Image im, int w, int h)
        throws IOException
    {
        this(1);
        setPixels(im, w, h);
        setUpArrays();
    }

    public NeuQuant(int sample, Image im, int w, int h)
        throws IOException
    {
        this(sample);
        setPixels(im, w, h);
        setUpArrays();
    }

    public NeuQuant(Image im, ImageObserver obs)
        throws IOException
    {
        this(1);
        setPixels(im, obs);
        setUpArrays();
    }

    private NeuQuant(int sample)
        throws IOException
    {
        network = new double[256][3];
        colormap = new int[256][4];
        netindex = new int[256];
        bias = new double[256];
        freq = new double[256];
        pixels = null;
        samplefac = 0;
        if(sample < 1)
            throw new IOException("Sample must be 1..30");
        if(sample > 30)
        {
            throw new IOException("Sample must be 1..30");
        } else
        {
            samplefac = sample;
            return;
        }
    }

    public NeuQuant(int sample, Image im, ImageObserver obs)
        throws IOException
    {
        this(sample);
        setPixels(im, obs);
        setUpArrays();
    }

    public int getColorCount()
    {
        return 256;
    }

    public Color getColor(int i)
    {
        if(i < 0 || i >= 256)
        {
            return null;
        } else
        {
            int bb = colormap[i][0];
            int gg = colormap[i][1];
            int rr = colormap[i][2];
            return new Color(rr, gg, bb);
        }
    }

    public int writeColourMap(boolean rgb, OutputStream out)
        throws IOException
    {
        for(int i = 0; i < 256; i++)
        {
            int bb = colormap[i][0];
            int gg = colormap[i][1];
            int rr = colormap[i][2];
            out.write(rgb ? rr : bb);
            out.write(gg);
            out.write(rgb ? bb : rr);
        }

        return 256;
    }

    protected void setUpArrays()
    {
        network[0][0] = 0.0D;
        network[0][1] = 0.0D;
        network[0][2] = 0.0D;
        network[1][0] = 1.0D;
        network[1][1] = 1.0D;
        network[1][2] = 1.0D;
        for(int i = 0; i < 3; i++)
        {
            freq[i] = 0.00390625D;
            bias[i] = 0.0D;
        }

        for(int i = 3; i < 256; i++)
        {
            double p[] = network[i];
            p[0] = (256D * (double)(i - 3)) / 253D;
            p[1] = (256D * (double)(i - 3)) / 253D;
            p[2] = (256D * (double)(i - 3)) / 253D;
            freq[i] = 0.00390625D;
            bias[i] = 0.0D;
        }

    }

    private void setPixels(Image im, ImageObserver obs)
        throws IOException
    {
        if(im == null)
        {
            throw new IOException("Image is null");
        } else
        {
            int w = im.getWidth(obs);
            int h = im.getHeight(obs);
            setPixels(im, w, h);
            return;
        }
    }

    private void setPixels(Image im, int w, int h)
        throws IOException
    {
        if(w * h < 503)
            throw new IOException("Image is too small");
        pixels = new int[w * h];
        PixelGrabber pg = new PixelGrabber(im, 0, 0, w, h, pixels, 0, w);
        try
        {
            pg.grabPixels();
        }
        catch(InterruptedException interruptedexception) { }
        if((pg.getStatus() & 0x80) != 0)
            throw new IOException("Image pixel grab aborted or errored");
        else
            return;
    }

    public void init()
    {
        learn();
        fix();
        inxbuild();
    }

    private void altersingle(double alpha, int i, double b, double g, 
            double r)
    {
        double n[] = network[i];
        n[0] -= alpha * (n[0] - b);
        n[1] -= alpha * (n[1] - g);
        n[2] -= alpha * (n[2] - r);
    }

    private void alterneigh(double alpha, int rad, int i, double b, double g, double r)
    {
        int lo = i - rad;
        if(lo < 2)
            lo = 2;
        int hi = i + rad;
        if(hi > 256)
            hi = 256;
        int j = i + 1;
        int k = i - 1;
        int q = 0;
        while(j < hi || k > lo) 
        {
            double a = (alpha * (double)(rad * rad - q * q)) / (double)(rad * rad);
            q++;
            if(j < hi)
            {
                double p[] = network[j];
                p[0] -= a * (p[0] - b);
                p[1] -= a * (p[1] - g);
                p[2] -= a * (p[2] - r);
                j++;
            }
            if(k > lo)
            {
                double p[] = network[k];
                p[0] -= a * (p[0] - b);
                p[1] -= a * (p[1] - g);
                p[2] -= a * (p[2] - r);
                k--;
            }
        }
    }

    private int contest(double b, double g, double r)
    {
        double bestd = 3.4028234663852886E+038D;
        double bestbiasd = bestd;
        int bestpos = -1;
        int bestbiaspos = bestpos;
        for(int i = 3; i < 256; i++)
        {
            double n[] = network[i];
            double dist = n[0] - b;
            if(dist < 0.0D)
                dist = -dist;
            double a = n[1] - g;
            if(a < 0.0D)
                a = -a;
            dist += a;
            a = n[2] - r;
            if(a < 0.0D)
                a = -a;
            dist += a;
            if(dist < bestd)
            {
                bestd = dist;
                bestpos = i;
            }
            double biasdist = dist - bias[i];
            if(biasdist < bestbiasd)
            {
                bestbiasd = biasdist;
                bestbiaspos = i;
            }
            freq[i] -= 0.0009765625D * freq[i];
            bias[i] += 1.0D * freq[i];
        }

        freq[bestpos] += 0.0009765625D;
        bias[bestpos]--;
        return bestbiaspos;
    }

    private int specialFind(double b, double g, double r)
    {
        for(int i = 0; i < 3; i++)
        {
            double n[] = network[i];
            if(n[0] == b && n[1] == g && n[2] == r)
                return i;
        }

        return -1;
    }

    private void learn()
    {
        int biasRadius = 2048;
        int alphadec = 30 + (samplefac - 1) / 3;
        int lengthcount = pixels.length;
        int samplepixels = lengthcount / samplefac;
        int delta = samplepixels / 100;
        int alpha = 1024;
        int i = 0;
        int rad = biasRadius >> 6;
        if(rad <= 1)
            rad = 0;
        System.err.println((new StringBuilder("beginning 1D learning: samplepixels=")).append(samplepixels).append("  rad=").append(rad).toString());
        int step = 0;
        int pos = 0;
        if(lengthcount % 499 != 0)
            step = 499;
        else
        if(lengthcount % 491 != 0)
            step = 491;
        else
        if(lengthcount % 487 != 0)
            step = 487;
        else
            step = 503;
        for(i = 0; i < samplepixels;)
        {
            int p = pixels[pos];
            int red = p >> 16 & 0xff;
            int green = p >> 8 & 0xff;
            int blue = p & 0xff;
            double b = blue;
            double g = green;
            double r = red;
            if(i == 0)
            {
                network[2][0] = b;
                network[2][1] = g;
                network[2][2] = r;
            }
            int j = specialFind(b, g, r);
            j = j >= 0 ? j : contest(b, g, r);
            if(j >= 3)
            {
                double a = (1.0D * (double)alpha) / 1024D;
                altersingle(a, j, b, g, r);
                if(rad > 0)
                    alterneigh(a, rad, j, b, g, r);
            }
            for(pos += step; pos >= lengthcount; pos -= lengthcount);
            if(++i % delta == 0)
            {
                alpha -= alpha / alphadec;
                biasRadius -= biasRadius / 30;
                rad = biasRadius >> 6;
                if(rad <= 1)
                    rad = 0;
            }
        }

        System.err.println((new StringBuilder("finished 1D learning: final alpha=")).append((1.0D * (double)alpha) / 1024D).append("!").toString());
    }

    private void fix()
    {
        for(int i = 0; i < 256; i++)
        {
            for(int j = 0; j < 3; j++)
            {
                int x = (int)(0.5D + network[i][j]);
                if(x < 0)
                    x = 0;
                if(x > 255)
                    x = 255;
                colormap[i][j] = x;
            }

            colormap[i][3] = i;
        }

    }

    private void inxbuild()
    {
        int previouscol = 0;
        int startpos = 0;
        for(int i = 0; i < 256; i++)
        {
            int p[] = colormap[i];
            int q[] = (int[])null;
            int smallpos = i;
            int smallval = p[1];
            for(int j = i + 1; j < 256; j++)
            {
                q = colormap[j];
                if(q[1] < smallval)
                {
                    smallpos = j;
                    smallval = q[1];
                }
            }

            q = colormap[smallpos];
            if(i != smallpos)
            {
                int j = q[0];
                q[0] = p[0];
                p[0] = j;
                j = q[1];
                q[1] = p[1];
                p[1] = j;
                j = q[2];
                q[2] = p[2];
                p[2] = j;
                j = q[3];
                q[3] = p[3];
                p[3] = j;
            }
            if(smallval != previouscol)
            {
                netindex[previouscol] = startpos + i >> 1;
                for(int j = previouscol + 1; j < smallval; j++)
                    netindex[j] = i;

                previouscol = smallval;
                startpos = i;
            }
        }

        netindex[previouscol] = startpos + 255 >> 1;
        for(int j = previouscol + 1; j < 256; j++)
            netindex[j] = 255;

    }

    public int convert(int pixel)
    {
        int alfa = pixel >> 24 & 0xff;
        int r = pixel >> 16 & 0xff;
        int g = pixel >> 8 & 0xff;
        int b = pixel & 0xff;
        int i = inxsearch(b, g, r);
        int bb = colormap[i][0];
        int gg = colormap[i][1];
        int rr = colormap[i][2];
        return alfa << 24 | rr << 16 | gg << 8 | bb;
    }

    public int lookup(int pixel)
    {
        int r = pixel >> 16 & 0xff;
        int g = pixel >> 8 & 0xff;
        int b = pixel & 0xff;
        int i = inxsearch(b, g, r);
        return i;
    }

    public int lookup(Color c)
    {
        int r = c.getRed();
        int g = c.getGreen();
        int b = c.getBlue();
        int i = inxsearch(b, g, r);
        return i;
    }

    public int lookup(boolean rgb, int x, int g, int y)
    {
        int i = rgb ? inxsearch(y, g, x) : inxsearch(x, g, y);
        return i;
    }

    private int not_used_slow_inxsearch(int b, int g, int r)
    {
        int bestd = 1000;
        int best = -1;
        for(int i = 0; i < 256; i++)
        {
            int p[] = colormap[i];
            int dist = p[1] - g;
            if(dist < 0)
                dist = -dist;
            int a = p[0] - b;
            if(a < 0)
                a = -a;
            dist += a;
            a = p[2] - r;
            if(a < 0)
                a = -a;
            dist += a;
            if(dist < bestd)
            {
                bestd = dist;
                best = i;
            }
        }

        return best;
    }

    protected int inxsearch(int b, int g, int r)
    {
        int bestd = 1000;
        int best = -1;
        int i = netindex[g];
        for(int j = i - 1; i < 256 || j >= 0;)
        {
            if(i < 256)
            {
                int p[] = colormap[i];
                int dist = p[1] - g;
                if(dist >= bestd)
                {
                    i = 256;
                } else
                {
                    if(dist < 0)
                        dist = -dist;
                    int a = p[0] - b;
                    if(a < 0)
                        a = -a;
                    dist += a;
                    if(dist < bestd)
                    {
                        a = p[2] - r;
                        if(a < 0)
                            a = -a;
                        dist += a;
                        if(dist < bestd)
                        {
                            bestd = dist;
                            best = i;
                        }
                    }
                    i++;
                }
            }
            if(j >= 0)
            {
                int p[] = colormap[j];
                int dist = g - p[1];
                if(dist >= bestd)
                {
                    j = -1;
                } else
                {
                    if(dist < 0)
                        dist = -dist;
                    int a = p[0] - b;
                    if(a < 0)
                        a = -a;
                    dist += a;
                    if(dist < bestd)
                    {
                        a = p[2] - r;
                        if(a < 0)
                            a = -a;
                        dist += a;
                        if(dist < bestd)
                        {
                            bestd = dist;
                            best = j;
                        }
                    }
                    j--;
                }
            }
        }

        return best;
    }

    public static final int ncycles = 100;
    public static final int netsize = 256;
    public static final int specials = 3;
    public static final int bgColour = 2;
    public static final int cutnetsize = 253;
    public static final int maxnetpos = 255;
    public static final int initrad = 32;
    public static final int radiusbiasshift = 6;
    public static final int radiusbias = 64;
    public static final int initBiasRadius = 2048;
    public static final int radiusdec = 30;
    public static final int alphabiasshift = 10;
    public static final int initalpha = 1024;
    public static final double gamma = 1024D;
    public static final double beta = 0.0009765625D;
    public static final double betagamma = 1D;
    private double network[][];
    protected int colormap[][];
    private int netindex[];
    private double bias[];
    private double freq[];
    public static final int prime1 = 499;
    public static final int prime2 = 491;
    public static final int prime3 = 487;
    public static final int prime4 = 503;
    public static final int maxprime = 503;
    protected int pixels[];
    private int samplefac;
}
